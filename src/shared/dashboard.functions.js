import {storage} from '@core/utils';

export function toHTML(key) {
    const data = storage(key)
    const id = key.split('_')[1]
    return `
        <li class="db__record">
            <a href="#excel/${id}">${data.tableName}</a>
            <div>
                <strong>${new Date(data.date).toLocaleDateString()}</strong>
                <strong>${new Date(data.date).toLocaleTimeString()}</strong>
            </div>
        </li>
    `
}

export function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }

    return keys
}

export function getAllRecords() {
    const keys = getAllKeys();

    if (keys.length === 0) {
        return `<p>Таблиц пока нет</p>`
    }

    return `
            <div class="db__list-header">
               <span>Table name</span>
                <span>Open date</span>
            </div>

            <ul class="db__list">
                ${keys.map(key => toHTML(key)).join('')}
            </ul>
    `
}
