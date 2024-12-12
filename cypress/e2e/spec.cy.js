describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  // Novo teste: Edição de tarefa
  it('Edita uma tarefa existente', () => {
    cy.visit('');

    // Adiciona uma tarefa
    cy.get('[data-cy=todo-input]')
      .type('Tarefa Original{enter}');

    // Edita a tarefa
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('label')
      .dblclick(); // Simula um duplo clique para editar

    // Digita o novo título
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('input.edit')
      .clear()
      .type('Tarefa Editada{enter}');

    // Verifica se a tarefa foi editada corretamente
    cy.get('[data-cy=todos-list]')
      .children()
      .first()
      .should('have.text', 'Tarefa Editada');
  });

  // Novo teste: Contagem de tarefas ativas
  it('Verifica contagem de tarefas ativas', () => {
    cy.visit('');

    // Adiciona duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    // Verifica contagem inicial
    cy.get('.todo-count')
      .should('contain', '2 items left');

    // Marca uma tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    // Verifica contagem após marcar uma tarefa como concluída
    cy.get('.todo-count')
      .should('contain', '1 item left');
  });

  // Novo teste: Limpeza de tarefas completas
  it('Limpa tarefas completas', () => {
    cy.visit('');

    // Adiciona duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para limpar{enter}')
      .type('Outra tarefa para limpar{enter}');

    // Marca a primeira tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    // Clica no botão "Clear completed"
    cy.contains("Clear completed").click();

    // Verifica se a lista contém apenas a tarefa não concluída
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Outra tarefa para limpar');
  });
});
