export type routearray = {
  path: string,
  name: string,
  meta: {
    role: string[],
    title?: string,
    icon?: string,
  },
  component?: () => Promise<typeof import("*.vue")>,
  children: routearray[]
}
