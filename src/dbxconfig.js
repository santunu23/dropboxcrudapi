var dbx;
var Dropbox=require('dropbox').Dropbox;
exports.dbx=new Dropbox({
	accessToken: 'YOUR ACCESSTOKEN',
	clientSecret:'YOUR CLIENT SECRET',
	clientId:'YOUR CLIENTID'
});

