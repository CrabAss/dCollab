export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 160
  },
  flexGrow: {
    flexGrow: 1,
  }
})