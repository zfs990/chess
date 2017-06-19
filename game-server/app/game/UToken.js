
var secret_key = 'InmbuvP6Z8';

var UToken = function(userid){
    this.userid = userid;
    this.exp = new Date().getTime() + 1000 * 60 * 60;        //毫秒级
};

module.exports = UToken;

UToken.prototype.refresh = function(){
    this.exp = new Date().getTime() + 1000 * 60 * 60;
};

UToken.prototype.encrypt = function(){
    var crypto = require('crypto');
    var cipher = crypto.createCipher('aes-256-cbc',secret_key);
    var str = JSON.stringify(this);
    var crypted = cipher.update(str,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
};


UToken.prototype.decrypt = function(tokenString){
    var decipher = crypto.createDecipher('aes-256-cbc', secret_key);
    var dec = decipher.update(tokenString,'hex','utf8');
    dec += decipher.final('utf8');
    var obj = JSON.parse(dec);
    this.userid = obj.userid;
    this.exp = obj.exp;
}
