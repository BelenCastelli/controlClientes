const app = require('./app')
require('./database')

app.listen(app.get('port'), function (){
    console.log('server listen on port' + app.get('port'))
})

