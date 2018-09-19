// https://github.com/facebook/create-react-app/blob/next/packages/create-react-app/createReactApp.js
const spawn = require('cross-spawn')
const chalk = require('chalk')
const dns = require('dns')
const url = require('url')
const execSync = require('child_process').execSync

function shouldUseYarn() {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' });
      return true
    } catch ( e ) {
      return false
    }
}
function getProxy() {
    if ( process.env.https_proxy ) {
      return process.env.https_proxy
    } else {
      try {
        // Trying to read https-proxy from .npmrc
        let httpsProxy = execSync('npm config get https-proxy')
          .toString()
          .trim() ;
        return httpsProxy !== 'null' ? httpsProxy : undefined;
      } catch (e) {
        return;
      }
    }
}

function checkIfOnline(useYarn) {
    if (!useYarn) {
        return Promise.resolve(true);
    }
    return new Promise(resolve => {
        dns.lookup('registry.yarnpkg.com', err => {
            let proxy;
            if (err != null && (proxy = getProxy())) {
                dns.lookup(url.parse(proxy).hostname, proxyErr => {
                    resolve(proxyErr == null);
                });
            } else {
                resolve(err == null);
            }
        });
    });
}

function checkThatNpmCanReadCwd() {
    const cwd = process.cwd() ;
    let childOutput = null ;
    try {
      // Note: intentionally using spawn over exec since
      // the problem doesn't reproduce otherwise.
      // `npm config list` is the only reliable way I could find
      // to reproduce the wrong path. Just printing process.cwd()
      // in a Node process was not enough.
      childOutput = spawn.sync('npm', ['config', 'list']).output.join('');
    } catch (err) {
      // Something went wrong spawning node.
      // Not great, but it means we can't do this check.
      // We might fail later on, but let's continue.
      return true;
    }
    if (typeof childOutput !== 'string') {
      return true;
    }
    const lines = childOutput.split('\n');
    // `npm config list` output includes the following line:
    // "; cwd = C:\path\to\current\dir" (unquoted)
    // I couldn't find an easier way to get it.
    const prefix = '; cwd = ';
    const line = lines.find(line => line.indexOf(prefix) === 0);
    if (typeof line !== 'string') {
      // Fail gracefully. They could remove it.
      return true;
    }
    const npmCWD = line.substring(prefix.length);
    if (npmCWD === cwd) {
      return true;
    }
    console.error(
      chalk.red(
        `Could not start an npm process in the right directory.\n\n` +
          `The current directory is: ${chalk.bold(cwd)}\n` +
          `However, a newly started npm process runs in: ${chalk.bold(
            npmCWD
          )}\n\n` +
          `This is probably caused by a misconfigured system terminal shell.`
      )
    );
    if (process.platform === 'win32') {
      console.error(
        chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
          `  ${chalk.cyan(
            'reg'
          )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
          `  ${chalk.cyan(
            'reg'
          )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
          chalk.red(`Try to run the above two lines in the terminal.\n`) +
          chalk.red(
            `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
          )
      );
    }
    return false;
}

exports.shouldUseYarn = shouldUseYarn

exports.install = async function install( root , useYarn , dependencies , verbose ) {
    if (!useYarn && !checkThatNpmCanReadCwd()) {
        console.warn( `找不到yarn或npm` )
        process.exit(1)
    }
    let isOnline = await checkIfOnline( useYarn )
    // return Promise.resolve( true )
    return new Promise((resolve, reject) => {
        let command
        let args
        let envConfig = {
            stdio: 'inherit' ,
        }
        if (useYarn) {
            command = 'yarnpkg'
            args = ['add', '--exact', '--dev']
            if (!isOnline) {
                args.push('--offline')
            }
            [].push.apply(args, dependencies)

            args.push( '--cwd' )
            args.push( root )

            if (!isOnline) {
                console.log(chalk.yellow('您可能未联网.'))
                console.log(chalk.yellow('回退使用本机的Yarn cache.'))
                console.log()
            }
        } else {
            command = 'npm'
            args = [
                'install' ,
                '--save-dev' ,
                '--save-exact' ,
                '--loglevel',
                'error' ,
            ].concat( dependencies )
            // fix安装目录出错 https://github.com/facebook/create-react-app/issues/3326
            // or process.chdir(root);
            Object.assign( envConfig , {
                cwd: root ,
            } )
        }

        if (verbose) {
            args.push('--verbose')
        }
        const child = spawn( command , args , envConfig )
        child.on('close', code => {
            if (code !== 0) {
                reject( {
                    command: `${command} ${args.join(' ')}`,
                } )
                return
            }
            resolve()
        })
    })
}