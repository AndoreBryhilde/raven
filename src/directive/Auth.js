import AuthorizationService from '../services/AuthorizationService';

const Auth = {
  beforeMount(element, binding) {
    if (!AuthorizationService.IsAuthorization(binding.value)) {
      const myElement = element;
      myElement.style.display = 'none';
    }
  },
};

export default Auth;
