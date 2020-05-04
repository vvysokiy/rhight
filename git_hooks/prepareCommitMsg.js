const fs = require('fs');
const colors = require('colors'); // eslint-disable-line import/no-extraneous-dependencies

const getIssueLink = (taskName) => {
  const number = taskName.split('issue-')[1];
  return `[${taskName}](https://github.com/vvysokiy/rhight/issues/${number})`;
};

const TAG_TYPE = '(Fix|New|Upgrade|Chore)';
const WIP_TAG = '(WIP)';
const ISSUE_TASK = 'issue-\\d{1,4}';
const MASTER_BRANCH = 'master';

// Регулярки под разные типы коммитов
const BRANCH_REGEXP = new RegExp(`${TAG_TYPE}: (${ISSUE_TASK}) (.*)\\s`);
const MASTER_REGEXP = new RegExp(`${TAG_TYPE}: (${MASTER_BRANCH}) (.*)\\s`);
const WIP_REGEXP = new RegExp(`${WIP_TAG}: (${MASTER_BRANCH}|${ISSUE_TASK}) (.*)\\s`);

const [, commitType] = process.env.HUSKY_GIT_PARAMS.split(' ');
const isMergeBranch = commitType === 'merge';

const messageFile = '.git/COMMIT_EDITMSG';

// Получение commit-message
const gitMessage = fs.readFileSync(messageFile, { encoding: 'utf-8' });
console.log('gitMessage', gitMessage);

// Сматчиваем все регулярки
const branchMatch = gitMessage.match(BRANCH_REGEXP);
const masterMatch = gitMessage.match(MASTER_REGEXP);
const wipMatch = gitMessage.match(WIP_REGEXP);

// Исключение мерж-коммитов
if (!isMergeBranch) {
  if (gitMessage.includes('chore(release):')) {
    console.log(colors.green.bold(`${gitMessage}    RELEASE!`));
    fs.writeFileSync(messageFile, gitMessage);
    // Если сматчился коммит в ветке задачи
  } if (branchMatch) {
    const [, tag, taskName, message] = branchMatch;
    const commitMessage = `${tag}: ${getIssueLink(taskName)} - ${message}`;

    fs.writeFileSync(messageFile, commitMessage);
    console.log(colors.green.bold(`${gitMessage}    you Maestro!`));

  // Если сматчился коммит в ветке master
  } else if (masterMatch) {
    const [, tag,, message] = masterMatch;
    const commitMessage = `${tag}: master HOTFIX - ${message}`;

    fs.writeFileSync(messageFile, commitMessage);
    console.log(colors.green.bold(`${gitMessage}    you Maestro!`));

  // Если сматчился коммит для разработки
  } else if (wipMatch) {
    const [, tag, taskName, message] = wipMatch;
    const commitMessage = `${tag}: ${taskName} - ${message}`;

    fs.writeFileSync(messageFile, commitMessage);
    console.log(colors.yellow.bold('Коммиты типа WIP нужны для разработки. Не забудьте их склеить в итоговый коммит!'));

  // Обработка ошибок именования
  } else {
    console.log(colors.red.bold(gitMessage), colors.red(
      'Ты пойман за руку! Сообщение не корректно. Правильное ведение коммитов позволяет вести чистый Changelog и быстрее находить баги.',
    ));
    console.log(colors.yellow.bold(
      'Правильные варианты сообщений:',
    ));
    console.log(colors.yellow(
      '1. {Тип изменений}: issue-{номер тикета} {информация о содержании коммита}',
    ));
    console.log(colors.yellow.bold('Пример:'), colors.yellow(
      'Fix: issue-0000 commit message',
    ));
    console.log(colors.yellow(
      '2. WIP: {master или issue-номер} {информация о содержании коммита}',
    ));
    console.log(colors.yellow.bold('Пример:'), colors.yellow(
      'WIP: issue-0000 commit message',
    ));
    console.log(colors.yellow(
      '3. {Тип изменений}: master {информация о содержании коммита}',
    ));
    console.log(colors.yellow.bold('Пример:'), colors.yellow(
      'Fix: master commit message',
    ));

    process.exit(1);
  }
}
