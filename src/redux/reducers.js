import { new_window, inactivate_window, activate_window, close_window, maximize_window, update_position, update_connection, open_ssh_modal } from "./actions";

const initialState = {
    SSHModalOpen: false,
    drawers: [

    ]
}

export const drawersReducer = (state = initialState, action) => {
    switch(action.type) {
        case new_window: {
            const drawers = [...state.drawers];
            drawers.push(createWindow(action.payload.connectionData));
            return {...state, drawers, SSHModalOpen: false};
        }
        case inactivate_window: {
            const drawers = [...state.drawers];
            const targetDrawer = drawers.find((x) => x.id === action.payload.id);
            targetDrawer.active = false;
            return {...state, drawers: drawers};
        }
        case activate_window: {
            const drawers = [...state.drawers];
            drawers.find((x) => x.id === action.payload.id).active = true;
            return {...state, drawers: drawers};
        }
        case close_window: {
            const drawers = state.drawers.filter((x) => x.id !== action.payload.id);
            return {...state, drawers: drawers};
        }
        case maximize_window: {
            const drawers = [...state.drawers];
            const targetDrawer = drawers.find((x) => x.id === action.payload);
            targetDrawer.style = {
                top: 40,
                left: 0,
                width: '100%',
                height: 'calc(100% - 40px)'
            };
            return {...state, drawers: drawers};
        }
        case update_position: {
            const drawers = [...state.drawers];
            drawers.find((x) => x.id === action.payload.id).style = action.payload.updatedPositions;
            return {...state, drawers: drawers};
        }
        case update_connection: {
            const drawers = [...state.drawers];
            drawers.find((x) => x.id === action.payload.id).connectionData = action.payload.connectionData;
            return {...state, drawers: drawers};
        }
        case open_ssh_modal: {
            return {...state, SSHModalOpen: !state.SSHModalOpen}
        }
        default:
            return state;
    }
}

const createWindow = (connectionData) => {
    return {
        id: new Date().getTime(),
        active: true,
        style: {
            top: 100, 
            left: 100, 
            width: 400, 
            height: 300
        },
        color: {
            r: 255, 
            g: 0,
            b: 0,
            a: 0.5
        },
        position: {
            x: 100,
            y: 100
        },
        connectionData: connectionData
    }
}