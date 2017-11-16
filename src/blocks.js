export default function (editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;

  //if (c.blocks.indexOf('snippets') >= 0) {
    c.param.forEach(a => {
      var name = a.name
      bm.add(name, {
        label: name,
        category: 'Snippets',
        content: { type: a.name },
        attributes: { class: 'fa fa-link' },
      });
    })

}
