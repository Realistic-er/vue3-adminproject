export type routearray = {
  path: string,
  name: string,
  meta: {
    role: string[]
  },
  component: () => Promise<typeof import("*.vue")>,
  children?: routearray[]
}
