'use strict';

import eventlist from 'event.json'

class Event {
  date = 0;
  alive = true;
  event: object | null;
  data = {
    food: {
      actual: 30,
      max: 80,
      recover: 10,
      loose: 6
    },
    wood: {
      actual: 30,
      max: 80,
      recover: 10,
      loose: 6
    },
    water: {
      actual: 30,
      max: 80,
      recover: 10,
      loose: 6
    },
    population: {
      actual: 0,
      max: 10
    }
  };

  constructor() {
  }

  private firstEvent() {
    let reply: object;

    if (this.event !== null) {
      this.event = eventlist.events.first;
      reply.text = this.event.text;
      reply.img_path = "";
      reply.button = [];
      this.event.answer.forEach(element => {
        reply.button.push(element.text);
      });
      reply.alive = true;
    } else {
      reply.error = true;
      reply.error_message = "Ask for first event but was already create";
    }

    return reply;
  }

  private subEvent(answer: number) {

  }

  private newEvent() {

  }

  private looseEvent(message: string) {
    let reply: object;

    this.alive = false;
    this.event = eventlist.loose;
    reply.text = message;
    reply.img_path = "";
    reply.button = [];
    reply.button.push(this.event.answer[0].text);
    reply.alive = false;

    return reply;
  }

  private applyConsequence(answer: number) {
    consequence = this.event.answer[answer].consequence;
    // Max
    if (consequence.food.max !== undefined) {
      data.food.max += consequence.food.max;
    }
    if (consequence.wood.max !== undefined) {
      data.wood.max += consequence.wood.max;
    }
    if (consequence.water.max !== undefined) {
      data.water.max += consequence.water.max;
    }
    if (consequence.population.max !== undefined) {
      data.population.max += consequence.population.max;
    }

    // Recover
    if (consequence.food.recover !== undefined) {
      data.food.recover += consequence.food.recover;
    }
    if (consequence.wood.recover !== undefined) {
      data.wood.recover += consequence.wood.recover;
    }
    if (consequence.water.recover !== undefined) {
      data.water.recover += consequence.water.recover;
    }

    // Loose
    if (consequence.food.loose !== undefined) {
      data.food.loose += consequence.food.loose;
    }
    if (consequence.wood.loose !== undefined) {
      data.wood.loose += consequence.wood.loose;
    }
    if (consequence.water.loose !== undefined) {
      data.water.loose += consequence.water.loose;
    }

    // Actual
    if (consequence.food.actual !== undefined) {
      data.food.actual += consequence.food.actual;
    }
    if (consequence.wood.actual !== undefined) {
      data.wood.actual += consequence.wood.actual;
    }
    if (consequence.water.actual !== undefined) {
      data.water.actual += consequence.water.actual;
    }
    if (consequence.population.actual !== undefined) {
      data.population.actual += consequence.population.actual;
    }

    // Food check
    if (data.food.actual <= 0) {
      return looseEvent("You village died of starving");
    }
    if (data.food.actual > data.food.max) {
      data.food.actual = data.food.max;
    }

    // Wood check
    if (data.wood.actual <= 0) {
      return looseEvent("You village died of cold");
    }
    if (data.wood.actual > data.wood.max) {
      data.wood.actual = data.wood.max;
    }

    // Water check
    if (data.water.actual <= 0) {
      return looseEvent("You village died of dehydration");
    }
    if (data.water.actual > data.water.max) {
      data.water.actual = data.water.max;
    }

    // Population check
    if (data.population.actual <= 0) {
      return looseEvent("You are alone, loneliness killed you");
    }
    if (data.population.actual > data.population.max) {
      return looseEvent("You wasn't able to control the population, the village as being destroyed");
    }
    return {};
  }

  roll(answer: number) {
    let reply: object;

    reply.error = false;
    if (answer === -1) {
      reply = Object.assign(reply, firstEvent());
    } else {
      if (this.event && answer >= 0 && answer < this.event.answer.length) {
        reply = Object.assign(reply, this.applyConsequence(answer));
        if (alive) {
          if (this.event.answer[answer].subevent) {
            reply = Object.assign(reply, this.subEvent(answer));
          } else {
            reply = Object.assign(reply, this.newEvent());
          }
        }
      } else {
        reply.error = true;
        if (this.event !== null) {
          reply.error_message = "Reply given in parameter, but no previous event exist";
        } else {
          reply.error_message = "Argument is out of possibilities (< -1 || > possible answers)";
        }
      }
    }
    return reply;
  }

  metaData() {

  }
}
