'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server.js');

describe('vanilla_server', function() {
	it('should respond to a time request', function(done) {
		chai.request('localhost:4444')
			.get('/time')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.time).to.not.eql(null);
				//This test idea inspiried by Clint Nelson
				var date = new Date(res.body.time);
				expect(date.valueOf()).to.not.eql(NaN);
				done();
			});
	});

	it('should respond to a plain greet request', function(done) {
		chai.request('localhost:4444')
			.get('/greet')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.message).to.eql('Hello World');
				done();
			});
	});

	it('should respond to a greet post', function(done) {
		chai.request('localhost:4444')
			.post('/greet')
			.send({name: 'zaphod'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.message).to.eql('Hello zaphod');
				done();
			});
	});

	it('should respond to a greet via url', function(done) {
		chai.request('localhost:4444')
			.get('/greet/testMan')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.message).to.eql('Hello testMan');
				done();
			});
	});

	it('should have a 404 page', function(done) {
		chai.request('localhost:4444')
			.get('/pagedoesntexist')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.message).to.eql('Page Not Found');
				done();
			});
	});
});