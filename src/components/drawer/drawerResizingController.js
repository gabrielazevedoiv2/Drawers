export default class DrawerResizingController {

    static topLeft(drawer, e) {
        if (drawer.getBoundingClientRect().top < '41' && e.clientY < '41') {
            return;
        }
        DrawerResizingController.resizeY(drawer, e, true);
        DrawerResizingController.resizeX(drawer, e, true);
        DrawerResizingController.repositionY(drawer, e);
        DrawerResizingController.repositionX(drawer, e);
    }

    static top(drawer, e) {
        if (drawer.getBoundingClientRect().top < '41' && e.clientY < '41') {
            return;
        }
        DrawerResizingController.resizeY(drawer, e, true)
        DrawerResizingController.repositionY(drawer, e);
    }

    static topRight(drawer, e) {
        if (drawer.getBoundingClientRect().top < '41' && e.clientY < '41') {
            return;
        }
        DrawerResizingController.resizeX(drawer, e);
        DrawerResizingController.resizeY(drawer, e, true);
        DrawerResizingController.repositionY(drawer, e);
    }

    static right(drawer, e) {
        DrawerResizingController.resizeX(drawer, e);
    }

    static bottomRight(drawer, e) {
        DrawerResizingController.resizeX(drawer, e);
        DrawerResizingController.resizeY(drawer, e);
    }

    static bottom(drawer, e) {
        DrawerResizingController.resizeY(drawer, e);
    }

    static bottomLeft(drawer, e) {
        DrawerResizingController.resizeX(drawer, e, true);
        DrawerResizingController.resizeY(drawer, e);
        DrawerResizingController.repositionX(drawer, e);
    }

    static left(drawer, e) {
        DrawerResizingController.resizeX(drawer, e, true);
        DrawerResizingController.repositionX(drawer, e);
    }

    static resizeX(drawer, e, reversible) {
        const rect = drawer.getBoundingClientRect();
        if (reversible) {
            drawer.style.width = ((drawer.clientWidth) + (rect.left - (e.pageX))) + 'px';
        } else {
            drawer.style.width = ((drawer.clientWidth) + (e.pageX - (rect.x + rect.width))) + 'px';
        }        
    }

    static resizeY(drawer, e, reversible) {
        const rect = drawer.getBoundingClientRect();
        if (reversible) {
            drawer.style.height = ((drawer.clientHeight) + (rect.top - (e.pageY))) + 'px';
        } else {
            drawer.style.height = ((drawer.clientHeight) + (e.pageY - (rect.y + rect.height))) + 'px';
        }      
    }

    static repositionX(drawer, e, padding) {
        const rect = drawer.getBoundingClientRect();
        if (padding) {
            drawer.style.left = ((rect.left - (rect.x - e.pageX)) - padding) + 'px';
        } else {
            drawer.style.left = (rect.left - (rect.x - e.pageX)) + 'px';
        }
    }

    static repositionY(drawer, e, padding) {
        const rect = drawer.getBoundingClientRect();
        if (padding) {
            drawer.style.top = ((rect.top - (rect.y - e.pageY)) - padding) + 'px';
        } else {
            drawer.style.top = (rect.top - (rect.y - e.pageY)) + 'px';
        }
    }
}