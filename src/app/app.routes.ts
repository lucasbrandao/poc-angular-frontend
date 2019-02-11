import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {
        path: '', component: AppComponent, children:
            [
                { path: 'technical-test', component: AppComponent },
            ]
    }
];

export const router: ModuleWithProviders = RouterModule.forRoot(appRoutes);
