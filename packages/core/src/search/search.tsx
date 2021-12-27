import { Search as SearchIcon } from "@taroify/icons"
import { ITouchEvent, View } from "@tarojs/components"
import { BaseEventOrig } from "@tarojs/components/types/common"
import { InputProps } from "@tarojs/components/types/Input"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { ReactNode } from "react"
import Field from "../field"
import Input, { InputAlign, InputClearTrigger } from "../input"
import { prefixClassname } from "../styles"
import { preventDefault } from "../utils/dom/event"

type SearchShape = "square" | "round"

interface SearchProps extends ViewProps {
  className?: string
  value?: string
  icon?: ReactNode
  label?: ReactNode
  shape?: SearchShape
  maxlength?: number
  placeholder?: string
  placeholderClassName?: string
  clearable?: boolean
  clearIcon?: ReactNode
  clearTrigger?: InputClearTrigger
  inputAlign?: InputAlign
  autoFocus?: boolean
  focus?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  message?: ReactNode
  action?: boolean | ReactNode

  onClear?(event: ITouchEvent): void

  onCancel?(event: ITouchEvent): void

  onSearch?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void

  onChange?(event: BaseEventOrig<InputProps.inputEventDetail>): void

  onFocus?(event: BaseEventOrig<InputProps.inputForceEventDetail>): void

  onBlur?(event: BaseEventOrig<InputProps.inputValueEventDetail>): void
}

function Search(props: SearchProps) {
  const {
    className,
    value,
    icon = <SearchIcon />,
    label,
    shape = "square",
    maxlength,
    placeholder,
    placeholderClassName,
    clearable = true,
    clearIcon,
    clearTrigger,
    inputAlign,
    autoFocus,
    focus,
    disabled,
    readonly,
    error,
    message,
    action,
    onClear,
    onCancel,
    onSearch,
    onChange,
    onFocus,
    onBlur,
    ...restProps
  } = props

  function handleSearch(event: BaseEventOrig<InputProps.inputValueEventDetail>) {
    preventDefault(event)
    onSearch?.(event)
  }

  return (
    <View
      className={classNames(
        prefixClassname("search"),
        {
          [prefixClassname("search--action")]: action,
        },
        className,
      )}
      {...restProps}
    >
      <View
        className={classNames(
          prefixClassname("search__content"),
          shape && prefixClassname(`search__content--${shape}`),
        )}
      >
        {label && <View className={prefixClassname("search__label")} children={label} />}
        <Field
          className={prefixClassname("search__field")}
          icon={icon}
          error={error}
          message={message}
        >
          <Input
            placeholderClassName={placeholderClassName}
            value={value}
            maxlength={maxlength}
            placeholder={placeholder}
            clearable={clearable}
            clearIcon={clearIcon}
            clearTrigger={clearTrigger}
            align={inputAlign}
            autoFocus={autoFocus}
            focus={focus}
            disabled={disabled}
            readonly={readonly}
            confirmType="search"
            onConfirm={handleSearch}
            onClear={onClear}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Field>
      </View>
      {action && (
        <View
          className={prefixClassname("search__action")}
          children={_.isBoolean(action) ? "取消" : action}
          onClick={_.isBoolean(action) ? onCancel : undefined}
        />
      )}
    </View>
  )
}

export default Search
