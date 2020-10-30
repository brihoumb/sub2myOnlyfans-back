import eventlist from './event.json';

interface Reply {
  text: string;
  imgPath: string[];
  button: string[];
  alive: boolean ;
  error: boolean ;
  errorMessage: string;
}

class Event {
  day: number;

  alive: boolean;

  daily: boolean;

  event: { [k: string]: any } = {};

  data = {
    food: {
      actual: 30,
      max: 80,
      recover: 6,
      loose: 3,
    },
    wood: {
      actual: 30,
      max: 80,
      recover: 6,
      loose: 3,
    },
    water: {
      actual: 30,
      max: 80,
      recover: 6,
      loose: 3,
    },
    population: {
      actual: 0,
      max: 10,
    },
  };

  constructor() {
    this.day = 0;
    this.alive = true;
    this.daily = false;
  }

  private eventToReply() {
    const reply = {} as Reply;

    reply.text = this.event.text;
    if (this.event.img.length > 0) {
      reply.imgPath = this.event.img[Math.floor(Math.random() * this.event.img.length)];
    } else {
      reply.imgPath = [];
    }
    reply.button = [];
    this.event.answer.forEach((element: { [k: string]: any }) => {
      reply.button.push(element.text);
    });
    reply.alive = this.alive;
    return reply;
  }

  private firstEvent() {
    let reply = {} as Reply;

    if (this.event !== null) {
      this.event = eventlist.events.first;
      reply = this.eventToReply();
    } else {
      reply.error = true;
      reply.errorMessage = 'Ask for first event but was already create';
    }

    return reply;
  }

  private newEvent() {
    this.daily = !this.daily;

    if (this.daily) {
      this.event = eventlist.events.daily;
    } else {
      this.day += 1;
      const rd = Math.random();
      if (rd < 0.5) {
        this.event = eventlist.events.environnement[Math.floor(Math.random()
                     * eventlist.events.environnement.length)];
      } else if (rd < 0.85) {
        this.event = eventlist.events.character[Math.floor(Math.random()
                     * eventlist.events.character.length)];
      } else {
        this.event = eventlist.events.nothing[Math.floor(Math.random()
                     * eventlist.events.nothing.length)];
      }
    }
  }

  private looseEvent(message: string) {
    const reply = {} as Reply;

    this.alive = false;
    this.event = eventlist.events.loose;
    reply.text = message;
    reply.imgPath = [];
    reply.button = [];
    reply.button.push(this.event.answer[0].text);
    reply.alive = false;

    return reply;
  }

  private applyConsequence(answer: number) {
    const consequence: { [k:string]: any } = this.event.answer;
    // const consequence: { [k: string]: any } = this.event.answer[answer].consequence;

    if (Object.keys(consequence[answer].consequence).length > 0) {
      // Food
      if (consequence[answer].consequence.food !== undefined) {
        if (consequence[answer].consequence.food.max !== undefined) {
          this.data.food.max += consequence[answer].consequence.food.max;
        }
        if (consequence[answer].consequence.food.recover !== undefined) {
          this.data.food.recover += consequence[answer].consequence.food.recover;
        }
        if (consequence[answer].consequence.food.loose !== undefined) {
          this.data.food.loose += consequence[answer].consequence.food.loose;
        }
        if (consequence[answer].consequence.food.actual !== undefined) {
          this.data.food.actual += consequence[answer].consequence.food.actual;
        }
      }

      // Wood
      if (consequence[answer].consequence.wood !== undefined) {
        if (consequence[answer].consequence.wood.max !== undefined) {
          this.data.wood.max += consequence[answer].consequence.wood.max;
        }
        if (consequence[answer].consequence.wood.recover !== undefined) {
          this.data.wood.recover += consequence[answer].consequence.wood.recover;
        }
        if (consequence[answer].consequence.wood.loose !== undefined) {
          this.data.wood.loose += consequence[answer].consequence.wood.loose;
        }
        if (consequence[answer].consequence.wood.actual !== undefined) {
          this.data.wood.actual += consequence[answer].consequence.wood.actual;
        }
      }

      // Water
      if (consequence[answer].consequence.water !== undefined) {
        if (consequence[answer].consequence.water.max !== undefined) {
          this.data.water.max += consequence[answer].consequence.water.max;
        }
        if (consequence[answer].consequence.water.recover !== undefined) {
          this.data.water.recover += consequence[answer].consequence.water.recover;
        }
        if (consequence[answer].consequence.water.loose !== undefined) {
          this.data.water.loose += consequence[answer].consequence.water.loose;
        }
        if (consequence[answer].consequence.water.actual !== undefined) {
          this.data.water.actual += consequence[answer].consequence.water.actual;
        }
      }

      // Population
      if (consequence[answer].consequence.population !== undefined) {
        if (consequence[answer].consequence.population.max !== undefined) {
          this.data.population.max += consequence[answer].consequence.population.max;
        }
        if (consequence[answer].consequence.population.actual !== undefined) {
          this.data.population.actual += consequence[answer].consequence.population.actual;
        }
      }
    }

    // Daily check
    if (this.daily) {
      switch (answer) {
        case 0:
          this.data.food.actual += Math.round((this.data.food.recover / 4) * 3);
          break;
        case 1:
          this.data.wood.actual += Math.round((this.data.wood.recover / 4) * 3);
          break;
        case 2:
          this.data.water.actual += Math.round((this.data.water.recover / 4) * 3);
          break;
        default:
          break;
      }
      this.data.food.actual += Math.round(this.data.food.recover / 4) - this.data.food.loose;
      this.data.wood.actual += Math.round(this.data.wood.recover / 4) - this.data.wood.loose;
      this.data.water.actual += Math.round(this.data.water.recover / 4) - this.data.water.loose;
    }

    // Food check
    if (this.data.food.actual <= 0) {
      return this.looseEvent('You village died of starving');
    }
    if (this.data.food.actual > this.data.food.max) {
      this.data.food.actual = this.data.food.max;
    }

    // Wood check
    if (this.data.wood.actual <= 0) {
      return this.looseEvent('You village died of cold');
    }
    if (this.data.wood.actual > this.data.wood.max) {
      this.data.wood.actual = this.data.wood.max;
    }

    // Water check
    if (this.data.water.actual <= 0) {
      return this.looseEvent('You village died of dehydration');
    }
    if (this.data.water.actual > this.data.water.max) {
      this.data.water.actual = this.data.water.max;
    }

    // Population check
    if (this.data.population.actual <= 0) {
      return this.looseEvent('You are alone, loneliness killed you');
    }
    if (this.data.population.actual > this.data.population.max) {
      return this.looseEvent('You wasn\'t able to control the population, the village as being destroyed');
    }
    return {};
  }

  isAlive() {
    return this.alive;
  }

  roll(answer: number) {
    let reply = {} as Reply;

    reply.error = false;
    reply.errorMessage = '';
    if (answer === -1) {
      reply = Object.assign(reply, this.firstEvent());
    } else if (this.event && answer >= 0 && answer < this.event.answer.length) {
      reply = Object.assign(reply, this.applyConsequence(answer));
      if (this.alive) {
        if (this.event.answer[answer].subevent) {
          this.event = this.event.answer[answer].event;
        } else {
          this.newEvent();
        }
        reply = this.eventToReply();
      }
    } else {
      reply.error = true;
      if (this.event !== null) {
        reply.errorMessage = 'Reply given in parameter, but no previous event exist';
      } else {
        reply.errorMessage = 'Argument is out of possibilities (< -1 || > possible answers)';
      }
    }
    return reply;
  }

  metaData() {
    const reply : { [k: string]: any } = {};

    // Food
    reply.food = {};
    reply.food.actual = this.data.food.actual;
    reply.food.max = this.data.food.max;
    // Wood
    reply.wood = {};
    reply.wood.actual = this.data.wood.actual;
    reply.wood.max = this.data.wood.max;
    // Water
    reply.water = {};
    reply.water.actual = this.data.water.actual;
    reply.water.max = this.data.water.max;
    // Population
    reply.population = {};
    reply.population.actual = this.data.population.actual;
    reply.population.max = this.data.population.max;

    // Day
    reply.day = this.day;

    // Alive
    reply.alive = this.alive;

    return reply;
  }
}
