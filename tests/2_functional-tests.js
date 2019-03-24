/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const { suite, test, setup, teardown } = require('mocha');
const uuid = require('uuid/v4');

const server = require('../server');
const { createThread, deleteThread, createReply, deleteReply } = require('../libs/db-test-arrangers');

const assert = chai.assert;

chai.use(chaiHttp);

// by default all statuses are 200 or 400
// after you have written tests change response statuses according to specific case

suite('Functional Tests', () => {
  // arrange
  const ONE_DAY_LENGTH = 1000 * 60 * 60 * 24;

  suite('API ROUTING FOR /api/threads/:board', () => {
    
    suite('POST', () => { 
      test('new thread to /api/threads/general', done => {
        // arrange 
        const requestBody = {
          text: 'test text',
          delete_password: '12345'
        };
        const expectedStatus = 200;
        const expectedBody = {
          _id: null,
          text: 'test text',
          created_on: Date.now(),
          bumped_on: Date.now(),
          reported: false,
          replies: []
        };

        // act 
        chai.request(server)
          .post('/api/threads/general')
          .send(requestBody)
          .end((err, res) => {            
            const actualStatus = res.status;
            const actualBody = res.body;

            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.hasAllKeys(res, Object.keys(expectedBody));
            assert.propertyVal(actualBody, 'text', expectedBody.text);
            assert.closeTo(Date.parse(actualBody.created_on), expectedBody.created_on, ONE_DAY_LENGTH);
            assert.closeTo(Date.parse(actualBody.bumped_on), expectedBody.bumped_on, ONE_DAY_LENGTH);
            assert.isFalse(actualBody.reported);
            assert.isArray(actualBody.replies);
            assert.isEmpty(actualBody.replies);

            done();
        });
      });

      teardown(done => {        
        deleteThread(done);
      });
    });
    
    suite('GET', () => {
      // arrange
      let _id = uuid();

      setup(done => {
        // arrange
        const thread = {
          _id,
          text: 'get - test thread 1',
          delete_password: '12345'
        };
        createThread(done, thread);
      });

      test('thread to /api/threads/general', done => {
        // arrange
        const expectedStatus = 200;
        const expectedLength = 1;

        // act 
        chai.request(server)
          .get('/api/threads/general')
          .end((err, res) => {
            const actualStatus = res.status;
            const actualBody = res.body;

            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.isArray(actualBody);
            assert.lengthOf(actualBody, expectedLength);

            done();
          });        
      });

      teardown(done => {
        deleteThread(done);
      });
    });
    
    suite('DELETE', () => {
      // arrange
      const _id = uuid();

      setup(done => {
        // arrange
        const thread = {
          _id,
          text: 'delete - test thread',
          delete_password: '12345'
        };
        createThread(done, thread);
      });
      test('successfully delete thread to /api/threads/general', done => {
        // arrange
        const requestBody = {
          thread_id: _id,
          delete_password: '12345'
        };
        const expectedStatus = 200;
        const expectedResponse = 'success';

        // act
        chai.request(server)
          .delete('/api/threads/general')
          .send(requestBody)
          .end((err, res) => {
            const actualStatus = 200;
            const actualResponse = res.body;

            //assert
            assert.equal(actualStatus, expectedStatus);
            assert.equal(actualResponse, expectedResponse);

            done();
          });
      });
    });
    
    suite('PUT', () => {
      // arrange
      const _id = uuid();

      setup(done => {
        // arrange
        const thread = {
          _id, 
          text: 'put - test thread',
          delete_password: '12345'
        };
        createThread(done, thread);
      });
      test('successfully report thread to /api/threads/general', done => {
        // arrange
        const requestBody = {
          thread_id: _id
        };
        const expectedStatus = 200;
        const expectedResponse = 'success';

        // act 
        chai.request(server)
          .put('/api/threads/general')
          .send(requestBody)
          .end((err, res) => {
            const actualStatus = res.status;
            const actualResponse = res.body;

            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.equal(actualResponse, expectedResponse);

            done();
          });
        });
        
      teardown(done => {
        deleteThread(done, _id);
      });
    });
    
  });
  
  suite('API ROUTING FOR /api/replies/:board', () => {
    // arrange 
    const threadId = uuid();
    
    suiteSetup(done => {
      const thread = {
        _id: threadId,
        text: 'Replies Test Suite',
        delete_password: '12345'
      };
      createThread(done, thread);
    });

    suite('POST', () => {
      test('new reply to thread Replies Test Suite', done => {
        // arrange
        const requestBody = {
          text: 'reply text',
          thread_id: threadId,
          delete_password: 'reply_password'
        };
        const expectedStatus = 200;
        const expectedBody = {
          _id: null,
          text: 'reply text',
          created_on: Date.now(),
          delete_password: 'reply_password',
          reported: false
        };

        // act 
        chai.request(server) 
          .post('/api/threads/general')
          .send(requestBody)
          .end((err, res) => {
            const actualStatus = res.status;
            const actualBody = res.body;            

            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.hasAllKeys(actualBody, Object.keys(expectedBody));
            assert.propertyVal(actualBody, 'text', expectedBody.text);
            assert.closeTo(Date.parse(actualBody.created_on), expectedBody.created_on, ONE_DAY_LENGTH);          
            assert.isFalse(actualBody.reported);

            done();
          });
      });

      teardown(done => {
        // should delete created reply
        deleteReply(done, thread_id);
      });
    });
    
    suite('GET', () => {      
      test('get thread with all replies', done => {
        // arrange
        const expectedStatus = 200;
        const expectedBody = {
          _id: threadId,
          text: 'Replies Test Suite',
          create_on: null,
          bumped_on: null,
          reported: false,
          replies: []
        };

        // act
        chai.request(server)
          .get(`/api/replies/general?thread_id=${threadId}`)
          .end((err, res) => {
            const actualStatus = res.status;
            const actualBody = res.body;
            
            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.hasAllKeys(actualBody, Object.keys(expectedBody));
            assert.propertyVal(actualBody, 'text', expectedBody.text);            

            done();
          });
      });
    });
    
    suite('PUT', () => {
      // arrange
      const reply_id = uuid();

      setup(done => {
        createReply(done, threadId, reply_id);
      });

      test('report a reply', done => {
        // arrange
        const requestBody = {
          thread_id: threadId,
          reply_id
        };
        const expectedStatus = 200;
        const expectedResponse = 'success';

        // act
        chai.request(server)
          .put('/api/replies/general')
          .send(requestBody)
          .end((err, res) => {
            const actualStatus = res.status;
            const actualResponse = res.body;
            
            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.equal(actualResponse, expectedResponse);

            done();
          });
      });

      teardown(done => {
        deleteReply(done, threadId, reply_id);
      });
    });
    
    suite('DELETE', () => {
      // arrange 
      const reply_id = uuid();
      const delete_password = 'reply_delete';

      setup(done => {
        createReply(done, threadId, reply_id);
      });

      test('delete a reply', done => {
        // arrange
        const requestBody = {
          thread_id: threaId,
          reply_id,
          delete_password
        };
        const expectedStatus = 200;
        const expectedResponse = 'success';
        
        // act
        chai.request(server)
          .delete('/api/replies/general')
          .send(requestBody)
          .end((err, res) => {
            const actualStatus = res.status;
            const actualResponse = res.body;

            // assert
            assert.equal(actualStatus, expectedStatus);
            assert.equeal(actualResponse, expectedResponse);

            done();
          });
      });
    });
    
    suiteTeardown(done => {
      deleteThread(done, threaId);
    });
  });

});
