import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class Page extends ApplicationAdapter {
    // posts and pages now include everything by default
    buildIncludeURL(store, modelName, id, snapshot, requestType, query) {
        return this.buildURL(modelName, id, snapshot, requestType, query);
    }

    buildURL() {
        const url = super.buildURL(...arguments);

        try {
            const parsedUrl = new URL(url);
            if (!parsedUrl.searchParams.get('formats')) {
                parsedUrl.searchParams.set('formats', 'mobiledoc,lexical');
                return parsedUrl.href;
            }
        } catch (e) {
            // noop, just use the original url
            console.error('Couldn\'t parse URL', e); // eslint-disable-line
        }

        return url;
    }
}
