// https://github.com/lambdalisue/jupyter-vim-binding/wiki/Customization

// Disable automatic insertion of matching braces, brackets, and parentheses
IPython.CodeCell.options_default.cm_config.autoCloseBrackets = false;

// Selecting all
require([
  'nbextensions/vim_binding/vim_binding',
], function() {
   CodeMirror.Vim.map("<C-a>", "ggVG", "normal");
});

// Enable <C-c> mapping to exit insert mode

m_config = require("notebook/js/cell").Cell.options_default.cm_config;
delete cm_config.extraKeys['Ctrl-C'];
// change settings for existing cells
Jupyter.notebook.get_cells().map(function(cell) {
    var cm = cell.code_mirror;
    if (cm) {
        delete cm.getOption('extraKeys')['Ctrl-C'];
    }
});
// map the keys
CodeMirror.Vim.map("<C-c>", "<Esc>", "insert");

Run cell scrolls the cell to top (scroll output into view)

// override two relevant actions by inserting a scroll-cell-top action
Jupyter.keyboard_manager.actions.register({
    'help': 'run selected cells',
    'handler': function(env, event) {
        env.notebook.command_mode();
        var actions = Jupyter.keyboard_manager.actions;
        actions.call('jupyter-notebook:run-cell', event, env);
        actions.call('jupyter-notebook:scroll-cell-top', event, env);
        env.notebook.edit_mode();
    }
}, 'run-cell', 'vim-binding');

Jupyter.keyboard_manager.actions.register({
    'help': 'run selected cells',
    'handler': function(env, event) {
        env.notebook.command_mode();
        var actions = Jupyter.keyboard_manager.actions;
        actions.call('jupyter-notebook:run-cell', event, env);
        actions.call('jupyter-notebook:scroll-cell-top', event, env);
        actions.call('jupyter-notebook:select-next-cell', event, env);
        env.notebook.edit_mode();
    }
}, 'run-cell-and-select-next', 'vim-binding');

// Calling a Jupyter shortcut
// https://github.com/jupyter/notebook/blob/master/notebook/static/notebook/js/actions.js
//require(['base/js/namespace'], function(ns) {
//    ns.keyboard_manager.actions.call('jupyter-notebook:run-cell-and-insert-below');
//});
