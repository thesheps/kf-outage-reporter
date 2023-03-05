import args from 'args';
import chalk from 'chalk';
import reportOutages from './src/reportOutages';

args.option('siteId', 'The id of the site to report outages for');

const flags = args.parse(process.argv);

console.log(chalk.whiteBright('🐙 💪 - Outage Reporter'));

if (flags.siteId) {
  reportOutages(flags.siteId).then((result) => {
    if (result.isSuccess()) {
      console.log(chalk.green('All done, have a great day now!'));
    } else {
      console.log(chalk.red(`Error encountered: ${result.error.message}`));
    }
  });
}
