# rhight

Разработка происходит в [storybook](https://storybook.js.org/)

`npm run storybook` - запуск сторибука

## Именование коммитов

В проектах действует соглашение об именовании коммитов, основанное на [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
Оно необходимо для автогенерации changelog для всех библиотек монорепозитория.

[Правила именований коммитов](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint)

- <p>Используемые теги из правил: <span style={{ background: "chartreuse" }}>Fix, New, Upgrade, Chore</span></p>
- <p>Дополнительный тег для разработки: <span style={{ background: "chocolate" }}>WIP</span></p>

Тег WIP необходим для разработки, но коммиты с этим тегом не попадут в changelog

Имя ветки автоматически подставится в ваш коммит, к тегом Fix, New, Upgrade, Chore добавится ссылка на jira.

#### Правильные варианты сообщений:

1. {Тип изменений}: {информация о содержании коммита}
    - Пример: Fix: issue-1 very long commit message
    - Пример: Chore: issue-1 very long commit message
2. WIP: {информация о содержании коммита}
    - Пример: WIP: issue-1 commit message

#### Commit squash

В тестовом варианте пробуем схему, когда одна задача - один коммит. Перед выкаткой надо сливать все коммиты в один.

[Как склеить коммиты и зачем это нужно](https://htmlacademy.ru/blog/useful/git/how-to-squash-commits-and-why-it-is-needed)