const AppLogService = {
    
  append(action, entity, entityId, description) {
    try {
      const userEmail = Session.getActiveUser().getEmail() || 'anonimo';
      const userName  = userEmail.includes('@') ? userEmail.split('@')[0] : userEmail;

      const entry = {
        id:          CrudRepository.generateId(),
        timestamp:   new Date().toISOString(),
        userEmail:   userEmail,
        userName:    userName,
        action:      action      || '',
        entity:      entity      || '',
        entityId:    entityId    || '',
        description: description || '',
      };

      CrudRepository.create(CONFIG.SHEETS.LOGS, entry);
    } catch (error) {
      Utils.logError('AppLogService.append', error);
    }
  },

};
