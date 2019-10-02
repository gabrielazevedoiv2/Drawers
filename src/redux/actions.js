export const new_window = "new_window";
export const inactivate_window = "inactivate_window";
export const activate_window = "activate_window";
export const close_window = "close_window";
export const maximize_window = "maximize_window";
export const update_position = "update_position";
export const update_connection = "update_connection";
export const open_ssh_modal = "open_ssh_modal";

export const createNewWindow = (connectionData) => {
    return {
        type: new_window,
        payload: {
            connectionData
        }
    }
}

export const inactivateWindow = (id) => {
    return {
        type: inactivate_window,
        payload: {
            id: id,
        }
    }
}

export const activateWindow = (id) => {
    return {
        type: activate_window,
        payload: {
            id
        }
    }
}

export const closeWindow = (id) => {
    return {
        type: close_window,
        payload: {
            id: id
        }
    }
}

export const maximizeWindow = (id) => {
    return {
        type: maximize_window,
        payload: {
            id
        }
    }
}

export const updatePosition = (id, updatedPositions) => {
    return {
        type: update_position,
        payload: {
            id,
            updatedPositions
        }
    }
}

export const updateConnection = (id, connectionData) => {
    return {
        type: update_connection,
        payload: {
            id,
            connectionData
        }
    }
}

export const openSSHModal = () => {
    return {
        type: open_ssh_modal,
    }
}