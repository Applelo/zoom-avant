# Accessibility

The component was build with accessibility in mind. It uses the right HTML element (`ul`, `li`, `nav`, `button`) to be SEO friendly and so, accessibility friendly.

The structure respects the ARIA Menu pattern and ARIA recommendations. Current menu is only focusable thanks of the use of `tabindex="-1"` attribute on non active menu elements. Also, `role` attributes `menu`, `menuitem` and `none` are use.

> Feel free to make a PR or an issue if something is wrong about accessibility. It's really important to make the web accessible to everyone.

## Recommendations

It's primordial to label the **ZoomAvant** drilldown. To do that, add an `aria-label` attribute to the root element like this:

```vue-html
<ZAvant aria-label="Mobile menu">
</ZAvant>
```

If you have a title which describe the menu, you can use the `aria-labelledby` attribute.

```vue-html
<div>
  <p id="mobile-menu-label">Mobile menu</p>
  <ZAvant aria-labelledby="mobile-menu-label">
  </ZAvant>
</div>
```

## Keyboard controls

You can control **ZoomAvant** with your keyboard.

- Arrow Up / Tab + Shift: Go to the item element
- Arrow Down / Tab: Go to the item element
- Enter / Space :
  - Access to the next menu if you are on the Next button
  - Access to the previous menu if you are on the Back button
- Escape: Return to the previous menu
- A letter: Focus on the first item with first letter
- Home:
  - If focus is on a button, and it is not the first button, moves focus to the first button.
  - If focus is on a link, and it is not the first link, moves focus to the first link.
- End:
  - If focus is on a button, and it is not the last button, moves focus to the last button.
  - If focus is on a link, and it is not the last link, moves focus to the last link.
- Any key that corresponds to a printable character: Move focus to the next item in the current menu whose label begins with that printable character.
