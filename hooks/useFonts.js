

export default useFonts = async () =>
  await Font.loadAsync({
    'Inter-Thin': require('../assets/fonts/Inter/static/Inter-Thin.ttf'),
    'Inter-Light': require('../assets/fonts/Inter/static/Inter-Light.ttf'),
  });