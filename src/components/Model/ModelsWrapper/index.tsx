import React, { useCallback, useRef, useState } from 'react';

import ModelsContext, { CarModel } from '../ModelsContext';

import ModelOverlay from '../ModelOverlay'

import { Container, OverlaysRoot } from './styles';


const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [registredModels, setRegistredModels] = useState<CarModel[]>([])

  const registerModel = useCallback((model: CarModel) => {
    setRegistredModels(state => [...state, model])
  }, [])

  const unregisterModel = useCallback((modelName: string) => {
    setRegistredModels(state => state.filter(model => model.modelName !== modelName))
  }, [])

  const getModelByName = useCallback((modelName: string) => {
    return registredModels.find(item => item.modelName === modelName) || null
  },
  [registredModels])
  
  return (
    <ModelsContext.Provider 
      value={{
      wrapperRef,
      registredModels,
      registerModel,
      unregisterModel,
      getModelByName
    }}>
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registredModels.map(item => (
          <ModelOverlay key={item.modelName} model={item}>
            {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlaysRoot>
        
        {children}
      </Container>
    </ModelsContext.Provider>
  )
}

export default ModelsWrapper;