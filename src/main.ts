import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '@app/app.module';
import { environment } from '@environment';

if (environment.production) {
    enableProdMode();
}

function pageReady() {
    const body = document.getElementsByTagName('app-root')[0];
    const load = document.getElementById('pre-bootstrap');
    load.remove();
    body.classList.add('active');
}

function boostrap() {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .then(() => pageReady())
        .catch(err => console.log(err));
}

function startApp() {
    const load = document.getElementById('pre-bootstrap');
    load.style.display = 'block';
    if (environment.production) {
        boostrap();
    } else {
        setTimeout(() => boostrap(), 2000);
    }
}

startApp();
