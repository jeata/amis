// page SubRenderer 类型
(function() {
    const renderers = [
        'https://schema.jeata.com/v2/action.json#',
        'https://schema.jeata.com/v2/button-group.json#',
        'https://schema.jeata.com/v2/cards.json#',
        'https://schema.jeata.com/v2/chart.json#',
        'https://schema.jeata.com/v2/collapse.json#',
        'https://schema.jeata.com/v2/divider.json#',
        'https://schema.jeata.com/v2/crud.json#',
        'https://schema.jeata.com/v2/date.json#',
        // 'https://schema.jeata.com/v2/dialog.json#',
        // 'https://schema.jeata.com/v2/drawer.json#',
        'https://schema.jeata.com/v2/dropdown-button.json#',
        'https://schema.jeata.com/v2/form.json#',
        'https://schema.jeata.com/v2/grid.json#',
        'https://schema.jeata.com/v2/hbox.json#',
        'https://schema.jeata.com/v2/iframe.json#',
        'https://schema.jeata.com/v2/image.json#',
        'https://schema.jeata.com/v2/json.json#',
        'https://schema.jeata.com/v2/list.json#',
        'https://schema.jeata.com/v2/mapping.json#',
        'https://schema.jeata.com/v2/nav.json#',
        'https://schema.jeata.com/v2/operation.json#',
        // 自己不能放在其他地方 'https://schema.jeata.com/v2/page.json#',
        'https://schema.jeata.com/v2/panel.json#',
        'https://schema.jeata.com/v2/plain.json#',
        'https://schema.jeata.com/v2/progress.json#',
        'https://schema.jeata.com/v2/service.json#',
        'https://schema.jeata.com/v2/status.json#',
        'https://schema.jeata.com/v2/switch.json#',
        'https://schema.jeata.com/v2/table.json#',
        'https://schema.jeata.com/v2/tabs.json#',
        'https://schema.jeata.com/v2/tasks.json#',
        'https://schema.jeata.com/v2/tpl.json#',
        'https://schema.jeata.com/v2/video.json#',
        'https://schema.jeata.com/v2/wizard.json#',
        'https://schema.jeata.com/v2/wrapper.json#',
        'https://schema.jeata.com/v2/page.json#/definitions/customRenderer'
    ];

    const root = {};
    let last = renderers.pop();
    let current = root;

    while(renderers.length) {
        const renderer = renderers.shift().replace(/#$/, '');

        current.if = {
            '$ref': `${renderer}#/definitions/test`
        };

        current.then = {
            '$ref': `${renderer}#/definitions/common`
        };

        current = current.else = {};
    }

    current['$ref'] = last;

    console.log(JSON.stringify(root, null, 4));
})();

// Cards 里面 field 类型
(function() {
    const renderers = [
        'https://schema.jeata.com/v2/tpl.json#',
        'https://schema.jeata.com/v2/image.json#',
        'https://schema.jeata.com/v2/date.json#',
        'https://schema.jeata.com/v2/status.json#',
        'https://schema.jeata.com/v2/mapping.json#',
        'https://schema.jeata.com/v2/progress.json#',
        'https://schema.jeata.com/v2/switch.json#',
        'https://schema.jeata.com/v2/hbox.json#',
        'https://schema.jeata.com/v2/grid.json#',
        'https://schema.jeata.com/v2/json.json#',
        'https://schema.jeata.com/v2/list.json#',
        'https://schema.jeata.com/v2/operation.json#',
        'https://schema.jeata.com/v2/plain.json#'
    ];

    const root = {};
    let last = renderers.pop().replace(/#$/, '');
    let current = root;

    while(renderers.length) {
        const renderer = renderers.shift().replace(/#$/, '');

        current.if = {
            '$ref': `${renderer}#/definitions/test`
        };

        current.then = {
            '$ref': `${renderer}#/definitions/common`
        };

        current = current.else = {};
    }

    current['$ref'] = `${last}#/definitions/common`;

    console.log(JSON.stringify(root, null, 4));
})();


// Control 里面各种类型
(function() {
    const renderers = [
        'https://schema.jeata.com/v2/form/array.json#',
        'https://schema.jeata.com/v2/form/button-group.json#',
        'https://schema.jeata.com/v2/form/button-toolbar.json#',
        'https://schema.jeata.com/v2/form/button.json#',
        'https://schema.jeata.com/v2/form/chained-select.json#',
        'https://schema.jeata.com/v2/form/checkbox.json#',
        'https://schema.jeata.com/v2/form/checkboxes.json#',
        'https://schema.jeata.com/v2/form/color.json#',
        'https://schema.jeata.com/v2/form/combo.json#',
        'https://schema.jeata.com/v2/form/control.json#',
        'https://schema.jeata.com/v2/form/date-range.json#',
        'https://schema.jeata.com/v2/form/date.json#',
        'https://schema.jeata.com/v2/form/datetime.json#',
        'https://schema.jeata.com/v2/form/editor.json#',
        'https://schema.jeata.com/v2/form/email.json#',
        'https://schema.jeata.com/v2/form/fieldSet.json#',
        'https://schema.jeata.com/v2/form/file.json#',
        'https://schema.jeata.com/v2/form/formula.json#',
        'https://schema.jeata.com/v2/form/grid.json#',
        'https://schema.jeata.com/v2/form/group.json#',
        'https://schema.jeata.com/v2/form/hbox.json#',
        'https://schema.jeata.com/v2/form/hidden.json#',
        'https://schema.jeata.com/v2/form/image.json#',
        'https://schema.jeata.com/v2/form/list.json#',
        'https://schema.jeata.com/v2/form/matrix.json#',
        'https://schema.jeata.com/v2/form/number.json#',
        'https://schema.jeata.com/v2/form/tag.json#',
        'https://schema.jeata.com/v2/form/panel.json#',
        'https://schema.jeata.com/v2/form/password.json#',
        'https://schema.jeata.com/v2/form/picker.json#',
        'https://schema.jeata.com/v2/form/radios.json#',
        'https://schema.jeata.com/v2/form/range.json#',
        'https://schema.jeata.com/v2/form/repeat.json#',
        'https://schema.jeata.com/v2/form/reset.json#',
        'https://schema.jeata.com/v2/form/rich-text.json#',
        'https://schema.jeata.com/v2/form/select.json#',
        'https://schema.jeata.com/v2/form/service.json#',
        'https://schema.jeata.com/v2/form/static.json#',
        'https://schema.jeata.com/v2/form/sub-form.json#',
        'https://schema.jeata.com/v2/form/submit.json#',
        'https://schema.jeata.com/v2/form/switch.json#',
        'https://schema.jeata.com/v2/form/table.json#',
        'https://schema.jeata.com/v2/form/tabs.json#',
        'https://schema.jeata.com/v2/form/text.json#',
        'https://schema.jeata.com/v2/form/textarea.json#',
        'https://schema.jeata.com/v2/form/time.json#',
        'https://schema.jeata.com/v2/form/tree-select.json#',
        'https://schema.jeata.com/v2/form/tree.json#',
        'https://schema.jeata.com/v2/form/url.json#',

        // 其他 renderers
        'https://schema.jeata.com/v2/divider.json#',
        'https://schema.jeata.com/v2/cards.json#',
        'https://schema.jeata.com/v2/chart.json#',
        'https://schema.jeata.com/v2/collapse.json#',
        'https://schema.jeata.com/v2/crud.json#',
        'https://schema.jeata.com/v2/iframe.json#',
        'https://schema.jeata.com/v2/nav.json#',
        'https://schema.jeata.com/v2/tasks.json#',
        'https://schema.jeata.com/v2/video.json#',
        'https://schema.jeata.com/v2/wrapper.json#',

        'https://schema.jeata.com/v2/form.json#/definitions/customControlItem'
    ];

    const root = {};
    let last = renderers.pop().replace(/#$/, '');
    let current = root;

    while(renderers.length) {
        const renderer = renderers.shift().replace(/#$/, '');

        current.if = {
            '$ref': `${renderer}#/definitions/test`
        };

        current.then = {
            '$ref': `${renderer}#/definitions/common`
        };

        current = current.else = {};
    }

    current['$ref'] = `${last}`;

    console.log(JSON.stringify(root, null, 4));
})();
