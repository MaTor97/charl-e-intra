export const timeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const seconds = Math.floor((now - past) / 1000);
      
        const intervals = [
          { label: 'an', seconds: 31536000 },
          { label: 'mois', seconds: 2592000 },
          { label: 'jour', seconds: 86400 },
          { label: 'heure', seconds: 3600 },
          { label: 'minute', seconds: 60 },
          { label: 'seconde', seconds: 1 },
        ];
      
        for (let i = 0; i < intervals.length; i++) {
          const interval = Math.floor(seconds / intervals[i].seconds);
          if (interval >= 1) {
            return `il y a ${interval} ${intervals[i].label}${interval > 1 && intervals[i].label !== 'mois' ? 's' : ''}`;
          }
        }
        return "à l'instant";
      };