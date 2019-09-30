
import rand from 'csprng';


export class Seed {

  static generate = (size=256, base=16) => (
    rand(size, base)
  )

}

export default Seed;
