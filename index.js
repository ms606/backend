const webServer = require('./services/web-server.js');
const dbConfig = require ('./config/database.js');
const defaultThreadPoolSize = 4;
const database = require('./services/database.js')


// Increase thread pool size by Pool Max 
process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function startup(){
    console.log('Starting application');
    

    try {
        console.log('Initializing database module');
        await database.initialize();

    }catch(err)  {
        console.log(err);

        process.exit(1);
    }

    try{
        console.log('Initializing web server module');

        await webServer.initialize();
    }catch(err){
        console.log(err);

        process.exit(1);
    }
}

async function shutdown(e){
    let err = e;
    console.log('Shutting Down');

    try {
        console.log('Closing web server module!');
        
        await webServer.close();

            try {
                console.log('Closing database module');

                await database.close();
            } catch (err) {
                console.log('Encountered error', e);

                err = err || e; 
            }

    } catch (e) {
        console.log('Encountered error', e); 

        err = err || e;
    }



    console.log('Exiting process');

    if (err) {
        process.exit(1); 
    }   else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exceptions');
    console.log(err);

    shutdown(err);
});

startup();