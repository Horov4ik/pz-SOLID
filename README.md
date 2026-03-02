# Practical lesson pz-SOLID  
# Практична реалізація SOLID принципів  

> У цьому занятті студенти отримують практичні навички застосування SOLID принципів під час рефакторингу існуючого коду.  
> Мета — створити гнучку, масштабовану та чисту архітектуру шляхом застосування SRP, OCP, LSP, ISP та DIP.

---

## What need to do:
* Провести аналіз вихідного «анти-SOLID» коду  
* Визначити порушення кожного SOLID принципу  
* Виконати рефакторинг згідно з:
  * SRP — Single Responsibility Principle  
  * OCP — Open/Closed Principle  
  * LSP — Liskov Substitution Principle  
  * ISP — Interface Segregation Principle  
  * DIP — Dependency Inversion Principle  
* Створити відповідні інтерфейси й абстракції  
* Усунути зайві або циклічні залежності  
* Додати мінімальний набір unit-тестів після рефакторингу  

---

## Acceptance criteria
* Реалізація на мові Typescript 
* Студент розуміє кожен SOLID принцип та пояснює його застосування  
* Увесь вихідний код проаналізовано  
* Усі порушення SOLID знайдено та описано  
* Після рефакторингу:
  * Кожен клас має одну відповідальність (SRP)  
  * Код розширюється через нові класи, а не редагування існуючих (OCP)  
  * Класи-нащадки повністю заміщають базові (LSP)  
  * Інтерфейси невеликі й специфічні (ISP)  
  * Залежності реалізовані через абстракції (DIP)  
* Код структурований, логічний та зрозумілий  
* Усі тести проходять успішно  
* Звіт оформлений у Markdown (README.md)

## Directory Structure
```
├── pz-SOLID
│   ├── src
│   │   ├── original          # код із навмисними порушеннями SOLID
│   │   ├── refactored        # код після рефакторингу
│   │   ├── interfaces        # абстракції та інтерфейси
│   ├── tests
│   │   ├── refactored.spec.js
│   ├── .editorconfig
│   ├── .gitignore
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
└──
```

## Useful links

[SOLID Principles Explained](https://www.baeldung.com/solid-principles)

[SOLID: The First 5 Principles of Object-Oriented Design](https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/)

[JavaScript SOLID: Реалізація принципів](https://khalilstemmler.com/articles/solid-principles/)

[Clean Code Concepts Adapted for JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

[Dependency Injection in JavaScript](https://javascript.plainenglish.io/dependency-injection-in-javascript-1b82a8101c1a)



## Звіт (українською)

Нижче — короткий звіт про те, що зроблено відповідно до завдання.

1) Аналіз вихідного коду
- У `src/original/OrderProcessor.ts` — один клас виконує валідацію, розрахунок, збереження й відправку пошти. Це порушує SRP та створює жорсткі залежності.

2) Знайдені порушення SOLID
- SRP: клас `OrderProcessor` має кілька відповідальностей.
- OCP: розширити логіку (наприклад, додати інший спосіб збереження) вимагало б змін у класі, а не додавання нових реалізацій.
- LSP: немає чіткого базового контракту для підкласів — важко гарантувати сумісність підстановки.
- ISP: інтерфейсів немає, клієнти змушені залежати від всього класу.
- DIP: клас використовує конкретні реалізації (`saveToDatabase`, `sendEmail`) замість абстракцій.

3) Рефакторинг
- Створено інтерфейси в `src/interfaces/index.ts`: `IOrderValidator`, `IOrderCalculator`, `IOrderRepository`, `IEmailService`.
- Реалізації: `OrderValidator`, `OrderCalculator`, `InMemoryOrderRepository`, `SimpleEmailService` у `src/refactored`.
- `OrderProcessor` тепер отримує залежності через конструктор (DIP) і лише координує роботу (SRP).
- Додав тести у `tests/refactored.spec.ts` для перевірки щасливого випадку та помилки валідації.

4) Примітки
- Код тепер відкритий для розширення: щоб додати нову стратегію збереження — реалізувати `IOrderRepository` і передати її в `OrderProcessor` (OCP).
- Інтерфейси маленькі й специфічні — ISP дотримано.
- LSP дотримано через контрактні інтерфейси: будь-яка реалізація інтерфейсу може бути підставлена.

5) Як запустити
 - Встановіть залежності: `npm install`
 - Скомпілювати: `npm run build`
 - Запустити тести: `npm test`

---

## Розподіл файлів за SOLID принципами (папка `src/principles`)

Нижче — які файли і класи віднесені до кожного принципу та коротке пояснення українською.

- SRP/
  - `SRP.ts` — демонструє, що кожен клас має одну відповідальність:
    - `OrderValidator` — лише валідація
    - `OrderCalculator` — лише обчислення суми
    - `SimpleEmailService` — лише надсилання email
    - `InMemoryOrderRepository` — лише збереження в пам'ять

- OCP/
  - `OCP.ts` — приклад розширення через нові класи, не змінюючи існуючий:
    - `OrderCalculator` — базова реалізація
    - `DiscountedOrderCalculator` — нове розширення (не змінює базовий клас)

- LSP/
  - `LSP.ts` — приклад сумісності реалізацій з інтерфейсом `IOrderRepository`:
    - `InMemoryOrderRepository` — коректна реалізація
    - `FaultyRepository` — приклад порушення (коментар)

- ISP/
  - `ISP.ts` — показує, що інтерфейси вузькі й кожен клієнт залежить лише від потрібної абстракції:
    - `IOrderValidator`, `IEmailService` використані у простих класах

- DIP/
  - `DIP.ts` — `OrderProcessor` інжектує інтерфейси (`IOrderValidator`, `IOrderCalculator`, `IOrderRepository`, `IEmailService`) замість конкретних реалізацій.

Ця структура допоможе студенту швидко знайти приклади для кожного принципу та зрозуміти, як саме було рефакторено проект.






