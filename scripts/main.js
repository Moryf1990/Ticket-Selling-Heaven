'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;
require('bootstrap');

Parse.initialize('rlCCtr8vPduQu6HqiVCyzINmmCQXs7DidOLHUXdh', 'ZYobph6clkbAn5vjwUKOcAnMgRkvOE5GLxINCW5f');

var NavigationComponent = require('./components/NavigationComponent');
var HomePageComponent = require('./components/HomePageComponent');
var RegisterComponent = require('./components/RegisterComponent');
var LoginComponent = require('./components/LoginComponent');
var LeaguesComponent = require('./components/LeaguesComponent');
var TeamsComponent = require('./components/TeamsComponent');
var GamesComponent = require('./components/GamesComponent');
var TicketsComponent = require('./components/TicketsComponent');
var SellTicketsComponent = require('./components/SellTicketsComponent');
var ViewTicketsComponent = require('./components/ViewTicketsComponent');
var ConfirmationComponent = require('./components/ConfirmationComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'register': 'register',
		'login': 'login',
		'logout': 'logout',
		'confirmation': 'confirmation',
		'leagues': 'leagues',
		'sellTickets': 'sellTickets',
		'viewTickets': 'viewTickets',
		'teams/:leagueId(/:teamId)': 'teams',
		'games/:teamId': 'games',
		'tickets/:gameId': 'tickets'
	},
	
	home: function() {
		ReactDOM.render(<HomePageComponent />, app);
	},
	logout: function() {
		Parse.User.logOut();
		this.navigate('', {trigger: true});
	},
	viewTickets: function() {
		ReactDOM.render(<ViewTicketsComponent />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router = {this} />, app);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router = {this} />, app);
	},
	confirmation: function() {
		ReactDOM.render(<ConfirmationComponent />, app);
	},
	leagues: function() {
		ReactDOM.render(<LeaguesComponent />, app);
	},
	teams: function(leagueId) {
		ReactDOM.render(<TeamsComponent leagueId = {leagueId} />, app);
	},
	games: function(teamId) {
		ReactDOM.render(<GamesComponent teamId = {teamId} />, app);
	},
	tickets: function(gameId) {
		ReactDOM.render(<TicketsComponent gameId = {gameId} router = {this} />, app);
	},
	sellTickets: function() {
		if (Parse.User.current()) {
			ReactDOM.render(<SellTicketsComponent router = {this} />, app);
		}
		else {
			ReactDOM.render(<LoginComponent router = {this} />, app);
		}
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);































