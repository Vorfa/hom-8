import quizData from './quiz-data.js';

const testForm = document.querySelector('.test-form');

// Получаю массив правильных ответов

const getAnswers = data => data.questions.map(question => question.answer);
const rigthAnswers = getAnswers(quizData);

// Создаю форму

const makeTest = (data) => {
    let form = '';

    const formTitle = data.title;
    const questions = data.questions;

    const sections = questions.map((block, blockIdx) => {
        let blocks = '';
        const choices = block.choices;

        const list = choices.map((choice, idx) => {
            const item = `<li class="test-form__list-item"><label class="text"><input type="radio" name="question${blockIdx + 1}" value="${idx}" />${choice}</label></li>`;

            return item;
        }).join('');

        blocks = `<section class="test-form__section"><h3 class="test-form__section-title text">${blockIdx + 1}. ${block.question}</h3><ul class="list test-form__list">${list}</ul></section>`;

        return blocks;
    }).join('');

    form = `<h2 class="test-form__title text">${formTitle}</h2>${sections}`;

    return form;
};

const readyForm = makeTest(quizData);

testForm.insertAdjacentHTML('afterbegin', readyForm);

// Вешаю слушатель

testForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const formEntries = form.entries();

    let rigthChoices = 0;
    let counter = 0;

    for (const entry of formEntries) {
        if(Number(entry[1]) === rigthAnswers[counter]){
            rigthChoices += 1;
        };
        counter += 1;
    };

    if(rigthChoices === rigthAnswers.length) {
        alert('Вы ответили на все вопросы правильно!');
    } else if(counter < rigthAnswers.length) {
        alert('Вы ответили не на все вопросы.');
    } else {
        const persentOfRightAnswers = (rigthChoices * 100 / rigthAnswers.length).toFixed(0);
        alert(`Вы ответили на ${persentOfRightAnswers}% вопросов верно.`);
    };
};





