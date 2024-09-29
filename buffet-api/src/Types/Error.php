<?php

namespace Buffet\Types;

enum Error: string {
    case NonExistentMethod = 'Tried to call a non-existent api method';
    case StatusPending = 'Status is still pending';
    case Failed = 'failed';
}