var bcryptjs = require('bcryptjs');

module.exports = {
    hashPassword(password) {
        var salt = bcryptjs.genSaltSync(10),
            encryptedPassword = bcryptjs.hashSync(password, salt);
        return encryptedPassword;
    },
    comparePassword(reqPassword, hPassword) {
        isLogin = bcryptjs.compare(reqPassword, hPassword, function(err, result){
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    }
}