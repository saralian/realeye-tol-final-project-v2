export function isClickInTell(clickX, clickY, tell) {
  return (
    clickX >= tell.x &&
    clickX <= tell.x + tell.width &&
    clickY >= tell.y &&
    clickY <= tell.y + tell.height
  )
}

export function getHitTell(clickX, clickY, primaryTells) {
  return primaryTells.find(tell => isClickInTell(clickX, clickY, tell)) ?? null
}
