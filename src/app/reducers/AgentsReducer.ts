import { useReducer, useEffect } from 'react';
import { State, Action } from '../../types';

const initialState: State = JSON.parse(localStorage.getItem('espresso-agents') || '[]');

const agentsReducer = (state: State, action: Action): State => {
  let newState: State;
  switch (action.type) {
    case 'CREATE_AGENT':
      newState = [...state, action.payload];
      break;
    case 'EDIT_AGENT':
      newState = state.map(agent => agent.email === action.payload.email ? action.payload : agent);
      break;
    case 'DELETE_AGENT':
      newState = state.filter(agent => agent.email !== action.payload);
      break;
    default:
      throw new Error('Unknown action type');
  }
  return newState;
};

export const useAgentsReducer = () => {
  const [state, dispatch] = useReducer(agentsReducer, initialState);

  useEffect(() => {
    localStorage.setItem('espresso-agents', JSON.stringify(state));
  }, [state]);

  return [state, dispatch] as const;
};
