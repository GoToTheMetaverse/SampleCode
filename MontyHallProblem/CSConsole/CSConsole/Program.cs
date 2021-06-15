using System;

namespace CSConsole
{
	class Program
	{
		static void Main(string[] args)
		{
			Display("아무키나 누르면 시작");
			Console.ReadKey();
			Display("시작                 ");
			
			var begin = DateTime.Now;

			var max = 1000;
			var game = new Game();
			var game2 = new Game();
			var game3 = new Game();
			var log = "";
			for (int i = 1; i <= max; i++)
			{
				game.Try(false);
				game2.Try(true);
				game3.Try(i % 2 == 0);

				float r = ((float)i) / ((float)max) * 100.0f;
				log = $"테스트 횟수: {i:n0} ({r:0.00}%)   ";
				log += $"\r\n선택을 안 바꾸는 경우: {game.p:0.0}%    ";
				log += $"\r\n선택을 바꾸는 경우: {game2.p:0.0}%    ";
				log += $"\r\n반만 바꾸는 경우: {game3.p:0.0}%    ";
				var elapse = DateTime.Now - begin;
				log += $"\r\n걸린시간: {elapse.TotalSeconds:0.0}";

				// 중간과정 표시
				//if(i % 100000 == 0)
				{
					Display(log);
					System.Threading.Thread.Sleep(10);
				}
			}

			Display(log);
			Console.ReadKey();
		}

		static void Display(string text)
		{
			Console.SetCursorPosition(0, 0);
			Console.WriteLine(text);
		}
	}

	class Game
	{
		Random rand = new Random();

		public int count = 0;
		public int car = 0;

		public float p // 퍼센트 0 ~ 100
		{
			get
			{
				float fcnt = count;
				float fcar = car;
				return (fcar / fcnt) * 100.0f;
			}
		}

		public bool Try(bool change)
		{
			count++;

			var doors = new bool[3] { false, false, false };

			var carIndex = rand.Next() % 3;
			doors[carIndex] = true;

			var myPick = rand.Next() % 3;
			int[] others = new int[2];
			others[0] = 0;
			if (myPick == 0)
			{
				others[0] = 1;
				others[1] = 2;
			}
			else if (myPick == 1)
			{
				others[0] = 0;
				others[1] = 2;
			}
			else
			{
				others[0] = 0;
				others[1] = 1;
			}

			var hostIndex = rand.Next() % 2;
			var hostIndex2 = (hostIndex + 1) % 2;
			hostIndex = others[hostIndex];
			hostIndex2 = others[hostIndex2];

			var hostPick = hostIndex;
			var hostPick2 = hostIndex2;
			if (doors[hostIndex])
			{
				hostPick = hostIndex2;
				hostPick2 = hostIndex;
			}

			// 내 선택을 번복하지 않음
			if (!change)
			{
				var ret = doors[myPick];
				if (ret)
					car++;
				return ret;
			}

			// 사회자 문열어준후 변경
			if (doors[hostPick2])
			{
				// 차선택
				car++;
				return true;
			}

			return false;
		}
	}
}
