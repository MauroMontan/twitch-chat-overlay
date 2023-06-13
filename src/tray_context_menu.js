const { Menu } = require("electron");



const trayMenuTemplate = (win, utils) => {
    return Menu.buildFromTemplate([
        {
            label: 'toggle movement',
            type: 'checkbox',
            checked: false,
            click: (e) => {
                if (e.checked) {
                    win.setIgnoreMouseEvents(true);
                } else {
                    win.setIgnoreMouseEvents(false);
                }
            },
        },

        {
            label: 'close',
            click: () => {
                utils.writeSettings(win.getSize(), win.getPosition());
                win.destroy();
            },
        },
    ]);

}
exports.trayMenuTemplate = trayMenuTemplate;