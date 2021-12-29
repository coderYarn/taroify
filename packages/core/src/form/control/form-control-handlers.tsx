import {
  Input as TaroInput,
  Switch as TaroSwitch,
  Textarea as TaroTextarea,
} from "@tarojs/components"
import { SwitchProps as TaroSwitchProps } from "@tarojs/components/types/Switch"
import { cloneElement, ReactElement, ReactNode } from "react"
import Checkbox, { CheckboxGroupProps, CheckboxProps } from "../../checkbox"
import Input, { InputProps } from "../../input"
import Radio, { RadioGroupProps } from "../../radio"
import Rate, { RateProps } from "../../rate"
import Slider, { SliderProps } from "../../slider"
import Stepper, { StepperProps } from "../../stepper"
import Switch, { SwitchProps } from "../../switch"
import Uploader, { UploaderProps } from "../../uploader"
import { FormController } from "../form.shared"
import FormControlHandler, { registerFormControlHandler } from "./form-control-handler"

registerFormControlHandler(
  new (class implements FormControlHandler<InputProps> {
    doControlRender(element: ReactElement<InputProps>, controller: FormController): ReactNode {
      const {
        name,
        value,
        validateStatus,
        onBlur: onDelegatingBlur,
        onChange: onDelegatingChange,
      } = controller
      const { props: elementProps } = element
      const { onBlur, onInput } = elementProps
      return cloneElement<InputProps>(element, {
        name,
        value,
        color: validateStatus === "invalid" ? "danger" : undefined,
        onInput: (e) => {
          onInput?.(e)
          onDelegatingChange?.(e.detail.value)
        },
        onBlur: (e) => {
          onBlur?.(e)
          onDelegatingBlur?.(e.detail.value)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return elementType === TaroInput || elementType === TaroTextarea || elementType === Input
    }
  })(),
)

registerFormControlHandler(
  new (class implements FormControlHandler<TaroSwitchProps> {
    doControlRender(element: ReactElement<TaroSwitchProps>, controller: FormController): ReactNode {
      const { name, value, onChange: onDelegatingChange } = controller
      const { props: elementProps } = element
      const { onChange } = elementProps
      return cloneElement<TaroSwitchProps>(element, {
        name,
        checked: value,
        onChange: (e) => {
          onChange?.(e)
          onDelegatingChange?.(e.detail.value)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return elementType === TaroSwitch
    }
  })(),
)

registerFormControlHandler(
  new (class implements FormControlHandler<CheckboxProps | SwitchProps> {
    doControlRender(
      element: ReactElement<CheckboxProps | SwitchProps>,
      controller: FormController,
    ): ReactNode {
      const { value, onChange: onDelegatingChange } = controller
      const { props: elementProps } = element
      const { onChange } = elementProps
      return cloneElement<CheckboxProps | SwitchProps>(element, {
        checked: value,
        onChange: (checked) => {
          onChange?.(checked)
          onDelegatingChange?.(checked)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return elementType === Checkbox || elementType === Switch
    }
  })(),
)

registerFormControlHandler(
  new (class
    implements
      FormControlHandler<
        | CheckboxGroupProps
        | RadioGroupProps
        | RateProps
        | SliderProps
        | StepperProps
        | UploaderProps
      > {
    doControlRender(
      element: ReactElement<
        | CheckboxGroupProps
        | RadioGroupProps
        | RateProps
        | SliderProps
        | StepperProps
        | UploaderProps
      >,
      controller: FormController,
    ): ReactNode {
      const { value, onChange: onDelegatingChange } = controller
      const { props: elementProps } = element
      const { onChange } = elementProps
      return cloneElement<
        | CheckboxGroupProps
        | RadioGroupProps
        | RateProps
        | SliderProps
        | StepperProps
        | UploaderProps
      >(element, {
        value,
        onChange: (nextValue: any) => {
          onChange?.(nextValue)
          onDelegatingChange?.(nextValue)
        },
      })
    }

    supportsControlType(elementType: any): boolean {
      return (
        elementType === Checkbox.Group ||
        elementType === Radio.Group ||
        elementType === Rate ||
        elementType === Slider ||
        elementType === Stepper ||
        elementType === Uploader
      )
    }
  })(),
)
