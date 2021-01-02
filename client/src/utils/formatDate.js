export const formatDate = (date) => {
    return new Intl.DateTimeFormat().format(new Date(date));
}

export const formatDateTime = (date) => {
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true
    };

    return new Intl.DateTimeFormat('default', options).format(new Date(date));
}