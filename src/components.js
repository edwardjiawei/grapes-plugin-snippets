export default function(editor, opt = {}) {
  const c = opt;
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const textType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;

  let stateNormal = 'Normal';
  let stateSuccess = 'Success';
  let stateError = 'Error';


  function camelCase(text){
    return text
  }

  const idTrait = {
    name: 'id',
    label: c.labelTraitId,
  };

  const forTrait = {
    name: 'for',
    label: c.labelTraitFor,
  };

  const nameTrait = {
    name: 'name',
    label: c.labelTraitName,
  };

  const placeholderTrait = {
    name: 'placeholder',
    label: c.labelTraitPlaceholder,
  };

  const valueTrait = {
    name: 'value',
    label: c.labelTraitValue,
  };

  const requiredTrait = {
    type: 'checkbox',
    name: 'required',
    label: c.labelTraitRequired,
  };

  const checkedTrait = {
    label: c.labelTraitChecked,
    type: 'checkbox',
    name: 'checked',
    changeProp: 1
  };

  const preventDefaultClick = () => {
    return defaultType.view.extend({
      events: {
        'mousedown': 'handleClick',
      },

      handleClick(e) {
        e.preventDefault();
      },
    });
  };
  c.param.forEach(a => {
    domc.addType(a.name, {
      model: defaultType.model.extend(
        {
          toHTML() {
            return a.html
          },
        },
        {
          isComponent(el) {
            if (
              el &&
              typeof el === 'object' &&
              el.getAttribute &&
              el.hasAttribute('data-type') &&
              el.getAttribute('data-type') === camelCase(a.name)
            ) {
              return { type: camelCase(a.name) }
            }
          },
        }
      ),
      view: defaultType.view.extend({
        render() {
          this.el.innerHTML = '<div style="pointer-events: none">' + a.html + '</div>';
          return this
        },
      }),
    })
  })
}
