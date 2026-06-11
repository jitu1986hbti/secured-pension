import { useDispatch, useSelector } from 'react-redux';
import { navigate, goBack } from '../store/navigationSlice';
import { ScreenName } from '../types';
import { RootState } from '../store';

export function useNavigation() {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state: RootState) => state.navigation.currentScreen);
  const history = useSelector((state: RootState) => state.navigation.history);

  return {
    navigate: (screen: ScreenName) => dispatch(navigate(screen)),
    goBack: () => dispatch(goBack()),
    currentScreen,
    canGoBack: history.length > 0
  };
}
