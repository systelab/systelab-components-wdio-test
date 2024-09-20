import { Router } from 'express';
import { TauriDriverAPI } from './tauri-driver.api';
import { ApplicationAPI } from './application.api';
import { ActionAPI } from './action.api';
import { QueryAPI } from './query.api';
import { WindowAPI } from './window.api';
import { KeyboardAPI } from './keyboard.api';

const wdioRouter: Router = Router();

// Tauri Driver
wdioRouter.post('/tauri-driver/start', TauriDriverAPI.start);
wdioRouter.post('/tauri-driver/stop', TauriDriverAPI.stop);

// Applications Management
wdioRouter.post('/applications/start', ApplicationAPI.start);
wdioRouter.post('/applications/:id/stop', ApplicationAPI.stop);
wdioRouter.post('/applications/:id/navigate', ApplicationAPI.navigate);
wdioRouter.get('/applications/:id/name', ApplicationAPI.getName);
wdioRouter.get('/applications/:id/version', ApplicationAPI.getVersion);
wdioRouter.get('/applications/:id/os', ApplicationAPI.getOperatingSystem);

// Window
wdioRouter.get('/applications/:id/window/size', WindowAPI.getSize);
wdioRouter.post('/applications/:id/window/size', WindowAPI.setSize);
wdioRouter.post('/applications/:id/window/fullscreen', WindowAPI.setFullscreen);

// Keyboard
wdioRouter.post('/applications/:id/keyboard/escape', KeyboardAPI.pressEscape);
wdioRouter.post('/applications/:id/keyboard/tab', KeyboardAPI.pressTab);
wdioRouter.post('/applications/:id/keyboard/backspace', KeyboardAPI.pressBackspace);
wdioRouter.post('/applications/:id/keyboard/enter', KeyboardAPI.pressEnter);
wdioRouter.post('/applications/:id/keyboard/delete', KeyboardAPI.pressDelete);
wdioRouter.post('/applications/:id/keyboard/text', KeyboardAPI.writeText);

// Queries
wdioRouter.get('/applications/:id/element/present', QueryAPI.isPresent);
wdioRouter.get('/applications/:id/element/displayed', QueryAPI.isDisplayed);
wdioRouter.get('/applications/:id/element/clickable', QueryAPI.isClickable);
wdioRouter.get('/applications/:id/element/enabled', QueryAPI.isEnabled);
wdioRouter.get('/applications/:id/element/selected', QueryAPI.isSelected);
wdioRouter.get('/applications/:id/element/focused', QueryAPI.isFocused);
wdioRouter.get('/applications/:id/element/text', QueryAPI.getText);
wdioRouter.get('/applications/:id/element/value', QueryAPI.getValue);
wdioRouter.get('/applications/:id/element/html', QueryAPI.getHTML);
wdioRouter.get('/applications/:id/element/attribute', QueryAPI.getAttribute);
wdioRouter.get('/applications/:id/element/css-property', QueryAPI.getCSSProperty);
wdioRouter.get('/applications/:id/element/property', QueryAPI.getProperty);
wdioRouter.get('/applications/:id/element/bounding-rect', QueryAPI.getBoundingRect);
wdioRouter.get('/applications/:id/element/position', QueryAPI.getPosition);
wdioRouter.get('/applications/:id/element/size', QueryAPI.getSize);
wdioRouter.get('/applications/:id/element/count', QueryAPI.count);


// Actions
wdioRouter.post('/applications/:id/element/click', ActionAPI.click);
// wdioRouter.post('/applications/:id/element/move-to', ActionAPI.moveTo);
// wdioRouter.post('/applications/:id/element/clear', ActionAPI.clear);
// wdioRouter.post('/applications/:id/element/write', ActionAPI.write);
// wdioRouter.post('/applications/:id/element/tap', ActionAPI.tap);

// Condition waits
// wdioRouter.post('/applications/:id/wait', ConditionWaitAPI.untilCondition);
// wdioRouter.post('/applications/:id/element/wait-present', ConditionWaitAPI.untilElementPresent);
// wdioRouter.post('/applications/:id/element/wait-displayed', ConditionWaitAPI.untilElementDisplayed);
// wdioRouter.post('/applications/:id/element/wait-clickable', ConditionWaitAPI.untilElementClickable);
// wdioRouter.post('/applications/:id/element/wait-enabled', ConditionWaitAPI.untilElementEnabled);

// Screenshots
// wdioRouter.post('/applications/:id/screenshot', ScreenshotAPI.takeAll);
// wdioRouter.post('/applications/:id/element/screenshot', ScreenshotAPI.takeElement);


export default wdioRouter;
