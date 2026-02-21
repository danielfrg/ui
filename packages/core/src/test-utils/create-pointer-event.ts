export function createPointerEvent(type: string, opts: any) {
  const evt = new Event(type, { bubbles: true, cancelable: true })
  Object.assign(
    evt,
    {
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      altKey: false,
      button: opts.button || 0,
      width: 1,
      height: 1,
    },
    opts,
  )
  return evt
}
