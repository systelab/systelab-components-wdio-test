import { Router } from 'express';
import { TauriDriverAPI } from './tauri-driver.api';
import { ApplicationAPI } from './application.api';

const wdioRouter: Router = Router();

// Tauri Driver
wdioRouter.post('/tauri-driver/start', TauriDriverAPI.start);
wdioRouter.post('/tauri-driver/stop', TauriDriverAPI.stop);


// Applications Management
wdioRouter.post('/applications/start', ApplicationAPI.start);
wdioRouter.post('/applications/:id/stop', ApplicationAPI.stop);

/*
// Actions
wdioRouter.post('/applications/:id/click', RemoteWDIO.click);


// Queries
wdioRouter.get('/applications/:id/text', RemoteWDIO.click);
*/

export default wdioRouter;
