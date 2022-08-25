const mongoose = require('mongoose')

describe('try to add,update,delete user', function() {
    test('add user', function(browser) {
      const mockObjectId = new mongoose.Types.ObjectId();
      browser
        .url('http://localhost:3000/')
        .waitForElementVisible('body')
        .assert.titleContains('Gestion utilisateurs')
        .click('.GI-header-link-addUser')
        .waitForElementVisible('body')
        .assert.visible('form')
        .setValue('input[name=name]', 'oliver-'+mockObjectId)
        .setValue('input[name=firstname]', 'tom')
        .setValue('input[name=mail]', 'usertest@live.fr')
        .click('button[type=submit]')
        .waitForElementVisible('body')
        .waitForElementVisible('.GI-card-oliver-'+mockObjectId)
        .assert.containsText('.GI-card-oliver-'+mockObjectId, "oliver-"+mockObjectId)
        //ajouter le reste du scenario. modifier utilisateur, supprimer utilisateur
        .end();
    })
  });