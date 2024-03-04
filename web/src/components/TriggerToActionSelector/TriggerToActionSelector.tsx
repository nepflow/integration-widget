import styles from './triggerToActionSelector.module.css'
import Select, { type SingleValue } from 'react-select'
import { type ReactNode, useCallback, useEffect, useMemo } from 'react'
import { type Service, type ServiceAction, type ServiceTrigger } from '../../models/service'
import Icon from '../Icon/Icon'

interface Props {
  action?: ServiceAction
  trigger?: ServiceTrigger

  rootService: Service
  connectedService: Service

  onChangeTrigger: (trigger?: ServiceTrigger) => void
  onChangeAction: (action?: ServiceAction) => void
}

interface Option {
  value: string
  label: ReactNode
  searchValue: string
}

export default function TriggerToActionSelector ({ action, trigger, rootService, connectedService, onChangeTrigger, onChangeAction }: Props) {
  const triggerObjects = useMemo(() => {
    if (!rootService.actions?.length) {
      return rootService.triggers
    } else if (!connectedService.actions?.length) {
      return connectedService.triggers
    }

    if (rootService.triggers < connectedService.triggers) {
      return rootService.triggers.concat(connectedService.triggers)
    } else {
      return connectedService.triggers.concat(rootService.triggers)
    }
  }, [rootService, connectedService])

  const actionObjects = useMemo(() => {
    if (trigger?.serviceId === connectedService.id) {
      return rootService.actions.concat(connectedService.actions)
    } else if (trigger?.serviceId === rootService.id) {
      return connectedService.actions.concat(rootService.actions)
    } else {
      if (rootService.actions < connectedService.actions) {
        return rootService.actions.concat(connectedService.actions)
      } else {
        return connectedService.actions.concat(rootService.actions)
      }
    }
  }, [rootService, connectedService, trigger])

  useEffect(() => {
    onChangeTrigger(trigger)
  }, [trigger])

  useEffect(() => {
    onChangeAction(action)
  }, [action])

  const handleTriggerChange = (newValue: SingleValue<{ value: string }>) => {
    const trigger = [...rootService.triggers, ...connectedService.triggers].find(t => t.id === newValue?.value)

    if (trigger) {
      onChangeTrigger(trigger)

      // Reset action
      if (action && trigger && action?.serviceId === trigger?.serviceId) {
        onChangeAction(undefined)
      }
    }
  }

  const handleActionChange = (newValue: SingleValue<{ value: string }>) => {
    const action = [...rootService.actions, ...connectedService.actions].find(a => a.id === newValue?.value)

    if (action) {
      onChangeAction(action)

      // Reset trigger
      if (action && trigger && action?.serviceId === trigger?.serviceId) {
        onChangeTrigger(undefined)
      }
    }
  }

  const selectStyles = useMemo(() => ({
    control: (baseStyles: any) => ({
      ...baseStyles,
      border: '1px solid #ccc',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #aaa'
      }
    })
  }), [])

  const getOption = useCallback((object: ServiceAction | ServiceTrigger) => {
    const isForRootService = rootService.id === object.serviceId

    const option: Option = {
      value: object.id,
      label: (
        <>
          <img className={styles.headerSelectOptionIcon} src={isForRootService ? rootService.iconURL : connectedService.iconURL} alt="" />
          <span className={styles.headerSelectOptionLabel}>{object.name}</span>
        </>
      ),
      searchValue: object.name
    }

    return option
  }, [rootService, connectedService])

  const filterOption = useCallback(({ data }: { data: Option }, input: string): boolean => {
    return input ? data.searchValue.toLowerCase().includes(input.toLowerCase()) : true
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.headerTrigger}>
        <div className={styles.headerFieldLabel}>Trigger</div>
        <Select
          styles={selectStyles}
          placeholder='Select a trigger'
          isSearchable
          onChange={handleTriggerChange}
          isOptionSelected={o => o.value === trigger?.id}
          value={trigger ? getOption(trigger) : null}
          options={triggerObjects.map(obj => getOption(obj))}
          filterOption={filterOption}
        />
      </div>
      <div className={styles.headerPointer}>
        <Icon icon='arrowRightCircle' size={24} className={styles.headerPointerArrow} />
      </div>
      <div className={styles.headerAction}>
        <div className={styles.headerFieldLabel}>Action</div>
        <Select
          styles={selectStyles}
          placeholder='Select an action'
          isSearchable
          onChange={handleActionChange}
          isOptionSelected={o => o.value === action?.id}
          value={action ? getOption(action) : null}
          options={actionObjects.map(obj => getOption(obj))}
          filterOption={filterOption}
        />
      </div>
    </div>
  )
}
