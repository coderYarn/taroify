import * as React from "react"
import Button from "../button"

export type ActionBarButtonType = "primary" | "info" | "warning" | "danger"

export interface ActionBarButtonProps {
  type?: ActionBarButtonType
  text?: string
  style?: string
}

function ActionBarButton(props: ActionBarButtonProps) {
  return (
    <Button color="primary" block>
      块级按钮
    </Button>
  )
}

export default ActionBarButton
